import subprocess
import sys
import unittest


class TestMain(unittest.TestCase):
    def test_cli_output(self) -> None:
        result = subprocess.run(
            [sys.executable, "-m", "app.main"],
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertIn("python is running", result.stdout)
