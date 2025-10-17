import pytest
from src.booking_manager import BookingManager

def test_add_booking():
    manager = BookingManager()
    booking = manager.add_booking("John", "2025-10-17")
    assert booking["name"] == "John"
    assert len(manager.get_all_bookings()) == 1

def test_delete_booking():
    manager = BookingManager()
    manager.add_booking("John", "2025-10-17")
    result = manager.delete_booking("John")
    assert result is True
    assert len(manager.get_all_bookings()) == 0

def test_add_booking_invalid_date():
    manager = BookingManager()
    with pytest.raises(ValueError):
        manager.add_booking("John", "invalid-date")
