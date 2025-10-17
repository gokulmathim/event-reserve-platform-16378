from src.utils import format_date

def test_format_date_valid():
    result = format_date("2025-10-17")
    assert result == "17 Oct 2025"

def test_format_date_invalid():
    result = format_date("not-a-date")
    assert result is None
