---
name: python-expert
description: Python expert skill for clean, efficient, and maintainable Python code. Covers best practices, design patterns, performance optimization, error handling, testing, and modern Python features. Perfect for Python development with idiomatic code and professional standards.
---

# Python Expert Skill

This skill provides comprehensive guidance for writing high-quality Python code with clean architecture, optimal performance, and maintainable design patterns.

## When to Use This Skill

Use this skill when the user requests:
- Python code development and architecture
- Clean code principles and best practices
- Performance optimization and profiling
- Error handling and exception management
- Testing strategies and test-driven development
- Design patterns and code organization
- Modern Python features and typing
- Package structure and project layout

## Core Capabilities

### Code Quality
- **Clean Code**: PEP 8 compliance and readability
- **Type Hints**: Modern Python typing and mypy integration
- **Documentation**: Docstrings and comprehensive comments
- **Code Organization**: Proper module structure and imports

### Performance
- **Optimization**: Profiling and performance tuning
- **Memory Management**: Efficient data structures and algorithms
- **Concurrency**: Async/await, threading, and multiprocessing
- **Caching**: Memoization and result caching strategies

### Architecture
- **Design Patterns**: Singleton, Factory, Observer, Strategy patterns
- **SOLID Principles**: Single responsibility, Open/Closed, Liskov, etc.
- **Package Structure**: Organizing projects and modules
- **Dependency Injection**: Loose coupling and testability

## Clean Code Principles

### Naming Conventions
```python
# ✅ GOOD: Clear, descriptive names
class UserAuthenticationService:
    def authenticate_user_with_credentials(self, username: str, password: str) -> bool:
        pass

# ❌ BAD: Unclear abbreviations
class AuthSvc:
    def auth_usr(self, un: str, pw: str) -> bool:
        pass
```

### Function Design
```python
# ✅ GOOD: Single responsibility, type hints
def calculate_discount(price: float, discount_rate: float) -> float:
    """Calculate discounted price with validation."""
    if not 0 <= discount_rate <= 1:
        raise ValueError("Discount rate must be between 0 and 1")
    return price * (1 - discount_rate)

# ❌ BAD: Multiple responsibilities, no validation
def process(price, rate):
    return price * (1 - rate)
```

### Class Structure
```python
# ✅ GOOD: Clear structure with type hints
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Order:
    id: str
    items: List[OrderItem]
    customer: Customer
    status: OrderStatus
    created_at: datetime
    
    def add_item(self, item: OrderItem) -> None:
        """Add item with validation."""
        if item.quantity <= 0:
            raise ValueError("Item quantity must be positive")
        self.items.append(item)
    
    def calculate_total(self) -> float:
        """Calculate order total with tax."""
        subtotal = sum(item.total_price for item in self.items)
        return subtotal * (1 + self.TAX_RATE)
    
    TAX_RATE = 0.08
```

## Modern Python Features

### Type Hints and Generics
```python
from typing import Generic, TypeVar, List, Optional
from dataclasses import dataclass

T = TypeVar('T')

class Repository(Generic[T]):
    """Generic repository pattern implementation."""
    
    def __init__(self, items: List[T] = None):
        self._items: List[T] = items or []
    
    def add(self, item: T) -> None:
        self._items.append(item)
    
    def find_by_id(self, item_id: str) -> Optional[T]:
        return next((item for item in self._items if item.id == item_id), None)

@dataclass
class Product:
    id: str
    name: str
    price: float

# Usage
product_repo = Repository[Product]()
```

### Context Managers
```python
from contextlib import contextmanager
from typing import Generator

@contextmanager
def database_connection(db_url: str) -> Generator[Connection, None, None]:
    """Context manager for database connections."""
    conn = Connection(db_url)
    try:
        conn.connect()
        yield conn
    finally:
        conn.close()

# Usage
with database_connection("postgresql://localhost/db") as db:
    result = db.execute("SELECT * FROM users")
```

### Async/Await Patterns
```python
import asyncio
from typing import List

async def fetch_user_data(user_ids: List[str]) -> dict:
    """Fetch user data concurrently."""
    tasks = [fetch_single_user(user_id) for user_id in user_ids]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    return {
        user_id: result 
        for user_id, result in zip(user_ids, results)
        if not isinstance(result, Exception)
    }

async def fetch_single_user(user_id: str) -> dict:
    """Fetch single user with error handling."""
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"/api/users/{user_id}") as response:
                return await response.json()
    except Exception as e:
        logger.error(f"Failed to fetch user {user_id}: {e}")
        raise
```

## Error Handling Strategies

### Exception Hierarchy
```python
class ApplicationError(Exception):
    """Base exception for application."""
    pass

class ValidationError(ApplicationError):
    """Validation related errors."""
    pass

class DatabaseError(ApplicationError):
    """Database related errors."""
    pass

class UserNotFoundError(DatabaseError):
    """User not found in database."""
    pass

# Usage
def get_user(user_id: str) -> User:
    try:
        return database.find_user(user_id)
    except DatabaseNotFoundError:
        raise UserNotFoundError(f"User {user_id} not found")
```

### Error Handling Patterns
```python
# ✅ GOOD: Specific exception handling
def process_payment(amount: float, card_info: CardInfo) -> Receipt:
    try:
        payment_gateway.charge(card_info, amount)
        return Receipt(amount=amount, status="success")
    except InsufficientFundsError:
        raise PaymentError("Insufficient funds")
    except CardDeclinedError:
        raise PaymentError("Card declined")
    except NetworkError as e:
        logger.error(f"Network error: {e}")
        raise PaymentError("Payment processing failed")

# ❌ BAD: Bare except
def process_payment_bad(amount: float, card_info: CardInfo):
    try:
        payment_gateway.charge(card_info, amount)
    except:  # Never use bare except
        pass
```

## Performance Optimization

### Profiling and Optimization
```python
import cProfile
import pstats
from functools import lru_cache
from typing import List

# Profiling decorator
def profile_function(func):
    """Profile function execution."""
    def wrapper(*args, **kwargs):
        profiler = cProfile.Profile()
        profiler.enable()
        result = func(*args, **kwargs)
        profiler.disable()
        
        stats = pstats.Stats(profiler)
        stats.sort_stats('cumulative')
        stats.print_stats(10)
        
        return result
    return wrapper

# Memoization for expensive operations
@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    """Calculate Fibonacci number with caching."""
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Generator for memory efficiency
def process_large_file(filename: str) -> Generator[str, None, None]:
    """Process large file line by line."""
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip().upper()
```

### Data Structure Optimization
```python
from collections import defaultdict, Counter
from typing import Dict, List

# ✅ GOOD: Use appropriate data structures
def analyze_text(text: str) -> Dict[str, int]:
    """Analyze word frequency efficiently."""
    words = text.lower().split()
    return Counter(words)

# ✅ GOOD: Defaultdict for grouping
def group_by_category(items: List[Item]) -> Dict[str, List[Item]]:
    """Group items by category."""
    groups = defaultdict(list)
    for item in items:
        groups[item.category].append(item)
    return dict(groups)

# ❌ BAD: Inefficient operations
def analyze_text_bad(text: str) -> Dict[str, int]:
    words = text.lower().split()
    result = {}
    for word in words:
        if word not in result:
            result[word] = 0
        result[word] += 1
    return result
```

## Testing Strategies

### Unit Testing with pytest
```python
import pytest
from unittest.mock import Mock, patch
from typing import List

class TestUserService:
    """Test suite for UserService."""
    
    def setup_method(self):
        """Setup for each test method."""
        self.user_service = UserService()
        self.mock_repo = Mock()
        self.user_service.repository = self.mock_repo
    
    def test_create_user_success(self):
        """Test successful user creation."""
        user_data = {"name": "John", "email": "john@example.com"}
        expected_user = User(id="123", **user_data)
        
        self.mock_repo.save.return_value = expected_user
        
        result = self.user_service.create_user(user_data)
        
        assert result.id == "123"
        assert result.name == "John"
        self.mock_repo.save.assert_called_once()
    
    def test_create_user_invalid_email(self):
        """Test user creation with invalid email."""
        user_data = {"name": "John", "email": "invalid-email"}
        
        with pytest.raises(ValidationError):
            self.user_service.create_user(user_data)
    
    @patch('external_api.send_welcome_email')
    def test_create_user_sends_email(self, mock_email):
        """Test that welcome email is sent."""
        user_data = {"name": "John", "email": "john@example.com"}
        expected_user = User(id="123", **user_data)
        
        self.mock_repo.save.return_value = expected_user
        
        self.user_service.create_user(user_data)
        
        mock_email.assert_called_once_with("john@example.com")
```

### Property-Based Testing
```python
import hypothesis
from hypothesis import given, strategies as st

@given(st.text(min_size=1, max_size=100))
def test_email_validation(email):
    """Test email validation with property-based testing."""
    if "@" in email and "." in email.split("@")[1]:
        assert is_valid_email(email) is True
    else:
        assert is_valid_email(email) is False

@given(st.lists(st.integers(min_value=1, max_value=1000), min_size=1))
def test_sum_calculator(numbers):
    """Test sum calculator with various inputs."""
    result = calculate_sum(numbers)
    assert result == sum(numbers)
    assert result >= 0
```

## Design Patterns

### Factory Pattern
```python
from abc import ABC, abstractmethod
from typing import Dict, Type

class Animal(ABC):
    """Abstract base class for animals."""
    
    @abstractmethod
    def make_sound(self) -> str:
        pass

class Dog(Animal):
    def make_sound(self) -> str:
        return "Woof!"

class Cat(Animal):
    def make_sound(self) -> str:
        return "Meow!"

class AnimalFactory:
    """Factory for creating animals."""
    
    _animals: Dict[str, Type[Animal]] = {
        "dog": Dog,
        "cat": Cat,
    }
    
    @classmethod
    def create_animal(cls, animal_type: str) -> Animal:
        """Create animal instance."""
        if animal_type not in cls._animals:
            raise ValueError(f"Unknown animal type: {animal_type}")
        
        animal_class = cls._animals[animal_type]
        return animal_class()
    
    @classmethod
    def register_animal(cls, animal_type: str, animal_class: Type[Animal]) -> None:
        """Register new animal type."""
        cls._animals[animal_type] = animal_class

# Usage
dog = AnimalFactory.create_animal("dog")
print(dog.make_sound())  # "Woof!"
```

### Observer Pattern
```python
from typing import List, Protocol

class Observer(Protocol):
    """Observer interface."""
    
    def update(self, message: str) -> None:
        ...

class Subject:
    """Subject that notifies observers."""
    
    def __init__(self):
        self._observers: List[Observer] = []
    
    def attach(self, observer: Observer) -> None:
        """Attach observer."""
        self._observers.append(observer)
    
    def detach(self, observer: Observer) -> None:
        """Detach observer."""
        self._observers.remove(observer)
    
    def notify(self, message: str) -> None:
        """Notify all observers."""
        for observer in self._observers:
            observer.update(message)

class EmailNotifier:
    """Email notification observer."""
    
    def update(self, message: str) -> None:
        print(f"Email sent: {message}")

class SMSNotifier:
    """SMS notification observer."""
    
    def update(self, message: str) -> None:
        print(f"SMS sent: {message}")

# Usage
subject = Subject()
subject.attach(EmailNotifier())
subject.attach(SMSNotifier())
subject.notify("Order shipped!")
```

## Package Structure

### Project Organization
```
my_project/
├── src/
│   ├── my_package/
│   │   ├── __init__.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── models.py
│   │   │   └── services.py
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── helpers.py
│   │   └── api/
│   │       ├── __init__.py
│   │       └── endpoints.py
├── tests/
│   ├── unit/
│   ├── integration/
│   └── conftest.py
├── docs/
├── requirements.txt
├── setup.py
├── pyproject.toml
└── README.md
```

### Import Best Practices
```python
# ✅ GOOD: Explicit imports
from typing import List, Dict, Optional
from dataclasses import dataclass
from .core.models import User, Order
from .utils.helpers import format_date

# ❌ BAD: Wildcard imports
from .core.models import *
from .utils.helpers import *

# ✅ GOOD: Relative imports for internal modules
from .models import User
from ..utils import helpers

# ✅ GOOD: Absolute imports for external packages
import requests
import pandas as pd
```

## Example Usage

### Code Review
"Review this Python function for performance and readability improvements"

### Architecture Design
"Design a Python package structure for a data processing application"

### Performance Optimization
"Optimize this Python code for better memory usage and speed"

### Testing Strategy
"Create a comprehensive test suite for this Python module"

Remember: Clean Python code is readable, maintainable, and follows established conventions. Always consider performance implications, error handling, and testing in your development.
