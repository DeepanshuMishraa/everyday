#!/usr/bin/env python3
"""Audit a launch-video project and rendered artifact."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from dataclasses import dataclass
from fractions import Fraction
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class Finding:
    check: str
    passed: bool
    detail: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Verify launch-video project files and final media properties."
    )
    parser.add_argument("--project", type=Path, required=True)
    parser.add_argument("--video", type=Path)
    parser.add_argument("--duration", type=float)
    parser.add_argument("--duration-tolerance", type=float, default=0.08)
    parser.add_argument("--fps", type=float)
    parser.add_argument("--width", type=int)
    parser.add_argument("--height", type=int)
    parser.add_argument("--allow-silent", action="store_true")
    return parser.parse_args()


def ffprobe(video: Path) -> dict[str, Any]:
    executable = shutil.which("ffprobe")
    if executable is None:
        raise RuntimeError("ffprobe is unavailable; install FFmpeg and rerun the audit.")
    command = [
        executable,
        "-v",
        "error",
        "-show_entries",
        "format=duration,size:stream=index,codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels",
        "-of",
        "json",
        str(video),
    ]
    completed = subprocess.run(
        command,
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        message = completed.stderr.strip() or "ffprobe failed without diagnostic output."
        raise RuntimeError(message)
    value = json.loads(completed.stdout)
    if not isinstance(value, dict):
        raise RuntimeError("ffprobe returned an unexpected payload.")
    return value


def numeric_fps(value: object) -> float | None:
    if not isinstance(value, str) or not value:
        return None
    try:
        return float(Fraction(value))
    except (ValueError, ZeroDivisionError):
        return None


def project_findings(project: Path) -> list[Finding]:
    required = ["BRIEF.md", "STORYBOARD.md", "frame.md", "index.html"]
    findings = [
        Finding(
            check=f"project:{name}",
            passed=(project / name).is_file(),
            detail=f"{name} {'exists' if (project / name).is_file() else 'is missing'}",
        )
        for name in required
    ]
    frames = project / "compositions" / "frames"
    frame_count = len(list(frames.glob("*.html"))) if frames.is_dir() else 0
    findings.append(
        Finding(
            check="project:frame-compositions",
            passed=frame_count > 0,
            detail=f"found {frame_count} frame composition(s)",
        )
    )
    return findings


def media_findings(args: argparse.Namespace, payload: dict[str, Any]) -> list[Finding]:
    streams_value = payload.get("streams")
    streams = streams_value if isinstance(streams_value, list) else []
    video_stream = next(
        (stream for stream in streams if stream.get("codec_type") == "video"), None
    )
    audio_stream = next(
        (stream for stream in streams if stream.get("codec_type") == "audio"), None
    )
    format_value = payload.get("format")
    media_format = format_value if isinstance(format_value, dict) else {}
    findings = [
        Finding("media:video-stream", video_stream is not None, "video stream present"),
        Finding(
            "media:audio-stream",
            args.allow_silent or audio_stream is not None,
            "audio stream present"
            if audio_stream is not None
            else "audio stream absent and silence was not allowed",
        ),
    ]
    if video_stream is not None:
        if args.width is not None:
            actual_width = video_stream.get("width")
            findings.append(
                Finding(
                    "media:width",
                    actual_width == args.width,
                    f"expected {args.width}, found {actual_width}",
                )
            )
        if args.height is not None:
            actual_height = video_stream.get("height")
            findings.append(
                Finding(
                    "media:height",
                    actual_height == args.height,
                    f"expected {args.height}, found {actual_height}",
                )
            )
        if args.fps is not None:
            actual_fps = numeric_fps(video_stream.get("r_frame_rate"))
            findings.append(
                Finding(
                    "media:fps",
                    actual_fps is not None and abs(actual_fps - args.fps) < 0.001,
                    f"expected {args.fps:g}, found {actual_fps}",
                )
            )
    if args.duration is not None:
        raw_duration = media_format.get("duration")
        try:
            actual_duration = float(raw_duration)
        except (TypeError, ValueError):
            actual_duration = None
        findings.append(
            Finding(
                "media:duration",
                actual_duration is not None
                and abs(actual_duration - args.duration) <= args.duration_tolerance,
                f"expected {args.duration:.3f}±{args.duration_tolerance:.3f}, found {actual_duration}",
            )
        )
    return findings


def main() -> int:
    args = parse_args()
    project = args.project.expanduser().resolve()
    findings = project_findings(project)
    errors: list[str] = []

    if args.video is not None:
        video = args.video.expanduser().resolve()
        findings.append(
            Finding(
                "media:file",
                video.is_file() and video.stat().st_size > 0,
                f"{video} {'is non-empty' if video.is_file() and video.stat().st_size > 0 else 'is missing or empty'}",
            )
        )
        if video.is_file() and video.stat().st_size > 0:
            try:
                findings.extend(media_findings(args, ffprobe(video)))
            except RuntimeError as error:
                errors.append(str(error))

    passed = not errors and all(finding.passed for finding in findings)
    result = {
        "passed": passed,
        "project": str(project),
        "findings": [
            {
                "check": finding.check,
                "passed": finding.passed,
                "detail": finding.detail,
            }
            for finding in findings
        ],
        "errors": errors,
    }
    json.dump(result, sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
