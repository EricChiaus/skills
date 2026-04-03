---
name: naming-convention
description: Comprehensive naming convention skill for standard English naming across programming languages. Covers language-specific conventions, common rules (functions start with verbs, booleans with is/has/should), and when to apply them. Emphasizes following existing conventions for code updates vs establishing standards for new projects.
---

# Naming Convention Skill

This skill provides comprehensive guidance for standard English naming conventions across programming languages, with emphasis on when to establish new standards versus following existing patterns.

## When to Use This Skill

Use this skill when the user requests:
- **New Project Setup**: Establish consistent naming standards from the beginning
- **Code Review**: Evaluate naming conventions and suggest improvements
- **Team Guidelines**: Create team-wide naming standards
- **Language Migration**: Adapt naming when moving between languages
- **Refactoring**: Improve naming while maintaining consistency
- **Documentation**: Write clear naming convention guidelines

## **IMPORTANT: When to Apply Conventions**

### ✅ **NEW PROJECTS** - Establish Standards
When creating **new applications or libraries**, establish and enforce consistent naming conventions from the start.

### ❌ **EXISTING CODE** - Follow Existing Patterns
When **updating or maintaining existing code**, analyze and follow the established conventions, even if they differ from standard practices.

### 🔄 **MIXED SCENARIOS** - Gradual Migration
When working with mixed codebases, maintain consistency within each module and gradually migrate toward standards.

## Universal Naming Rules

### Function and Method Names
- **Always start with a verb**: Describe what the function does
- Use present tense for actions: `getUser()`, `calculateTotal()`, `sendEmail()`
- Use past tense for completed actions: `createdUser()`, `validatedInput()`
- Use infinitive form for capabilities: `toLogin()`, `toSubmit()`

```python
# ✅ GOOD: Verb-first, clear purpose
def calculate_user_age(birth_date: date) -> int:
    pass

def validate_email_format(email: str) -> bool:
    pass

def send_welcome_email(user: User) -> None:
    pass

# ❌ BAD: Unclear purpose, no verb
def user_age(birth_date: date) -> int:
    pass

def email_check(email: str) -> bool:
    pass

def email(user: User) -> None:
    pass
```

### Boolean Variables and Functions
- **Always start with**: `is`, `has`, `should`, `can`, `will`, `does`
- Use `is` for state/condition: `isActive`, `isValid`, `isLoggedIn`
- Use `has` for possession/containment: `hasPermission`, `hasItems`, `hasErrors`
- Use `should` for recommendations/requirements: `shouldRefresh`, `shouldValidate`
- Use `can` for capabilities: `canEdit`, `canDelete`, `canAccess`
- Use `will` for future events: `willExpire`, `willRedirect`

```javascript
// ✅ GOOD: Boolean prefixes
const isActive = true;
const hasPermission = false;
const shouldRefresh = true;
const canEdit = user.role === 'admin';
const willExpire = checkExpiration(token);

// ❌ BAD: Unclear boolean meaning
const active = true;
const permission = false;
const refresh = true;
const edit = user.role === 'admin';
const expire = checkExpiration(token);
```

### Variable and Property Names
- Use **nouns** for data: `userName`, `userList`, `orderTotal`
- Be **specific and descriptive**: `customerAddress` vs `address`
- Avoid **abbreviations**: `firstName` vs `fname`, `description` vs `desc`
- Use **singular** for single items, **plural** for collections: `user` vs `users`

### Constant Names
- Use **UPPER_SNAKE_CASE** for constants: `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`
- Include **units** when relevant: `TIMEOUT_SECONDS`, `MAX_FILE_SIZE_MB`
- Use **descriptive names**: `API_BASE_URL` vs `URL`

## Language-Specific Conventions

### Python
```python
# Variables and functions: snake_case
user_name = "John"
def calculate_total_price(items: list) -> float:
    return sum(item.price for item in items)

# Classes: PascalCase
class UserAuthenticationService:
    def __init__(self):
        self.is_authenticated = False

# Constants: UPPER_SNAKE_CASE
MAX_LOGIN_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

# Private members: prefix with underscore
class User:
    def __init__(self):
        self._internal_id = None  # Private
        self.__very_private = None  # Name mangled
```

### JavaScript/TypeScript
```javascript
// Variables and functions: camelCase
const userName = "John";
function calculateTotalPrice(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}

// Classes: PascalCase
class UserAuthenticationService {
    constructor() {
        this.isAuthenticated = false;
    }
}

// Constants: UPPER_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 30;

// Private members: prefix with #
class User {
    #internalId = null;  # Private field
    _legacyPrivate = null;  # Convention (not enforced)
}
```

### Java
```java
// Variables and methods: camelCase
String userName = "John";
public double calculateTotalPrice(List<Item> items) {
    return items.stream().mapToDouble(Item::getPrice).sum();
}

// Classes: PascalCase
public class UserAuthenticationService {
    private boolean isAuthenticated = false;
    
    // Constants: UPPER_SNAKE_CASE
    public static final int MAX_LOGIN_ATTEMPTS = 3;
    private static final int DEFAULT_TIMEOUT = 30;
}

// Packages: lowercase with dots
package com.example.user.service;
```

### C#
```csharp
// Variables and methods: camelCase (private), PascalCase (public)
string userName = "John";
public double CalculateTotalPrice(List<Item> items) {
    return items.Sum(item => item.Price);
}

// Classes: PascalCase
public class UserAuthenticationService {
    private bool isAuthenticated = false;
    
    // Constants: PascalCase (public static readonly)
    public static readonly int MaxLoginAttempts = 3;
    private const int DefaultTimeout = 30;
}

// Interfaces: Prefix with I
public interface IUserRepository {
    User GetById(string id);
}
```

### Go
```go
// Variables and functions: camelCase (exported), camelCase (unexported)
var UserName = "John"  // Exported
var userName = "John"  // Unexported

func CalculateTotalPrice(items []Item) float64 {
    var total float64
    for _, item := range items {
        total += item.Price
    }
    return total
}

// Constants: camelCase
const MaxLoginAttempts = 3
const DefaultTimeout = 30

// Interfaces: PascalCase
type UserRepository interface {
    GetById(id string) User
}
```

### Rust
```rust
// Variables and functions: snake_case
let user_name = "John";
fn calculate_total_price(items: &[Item]) -> f64 {
    items.iter().map(|item| item.price).sum()
}

// Types: PascalCase
struct UserAuthenticationService {
    is_authenticated: bool,
}

// Constants: SCREAMING_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS: u32 = 3;
const DEFAULT_TIMEOUT: u32 = 30;
```

## Common Naming Patterns

### Data Structures
```python
# Collections: plural nouns
users = []           # List of users
user_dict = {}       # Dictionary of users
user_set = set()     # Set of users

# Maps: descriptive key-value pairs
user_by_id = {}      # Users indexed by ID
config_by_section = {}  # Config indexed by section

# Trees and graphs: clear hierarchy
root_node = TreeNode()
parent_child_map = {}
```

### Error Handling
```python
# Exceptions: PascalCase with Error/Exception suffix
class UserNotFoundError(Exception):
    pass

class InvalidInputError(Exception):
    pass

# Error variables: descriptive with error/err suffix
validation_error = None
network_err = None
last_error = None
```

### Configuration and Settings
```python
# Settings: descriptive with setting/config suffix
database_config = {}
app_settings = {}
user_preferences = {}

# Environment variables: clear purpose
DATABASE_URL = "postgresql://localhost/db"
API_BASE_URL = "https://api.example.com"
LOG_LEVEL = "INFO"
```

## File and Directory Naming

### Files
- **Use kebab-case** for most files: `user-service.py`, `auth-controller.js`
- **Use PascalCase** for classes in some languages: `UserService.cs`, `UserController.java`
- **Be descriptive**: `user-authentication-service.py` vs `auth.py`

### Directories
- **Use kebab-case**: `user-management/`, `api-endpoints/`, `test-data/`
- **Be specific**: `user-repository/` vs `repo/`
- **Group related files**: `components/buttons/`, `services/auth/`

## Database Naming

### Tables and Columns
```sql
-- Tables: plural snake_case
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email_address VARCHAR(255) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Junction tables: descriptive
CREATE TABLE user_roles (
    user_id INTEGER REFERENCES users(id),
    role_id INTEGER REFERENCES roles(id),
    assigned_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes and Constraints
```sql
-- Indexes: descriptive with table prefix
CREATE INDEX idx_users_email ON users(email_address);
CREATE INDEX idx_users_active_created ON users(is_active, created_at);

-- Constraints: descriptive
ALTER TABLE users ADD CONSTRAINT chk_users_email_format 
CHECK (email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
```

## API Naming

### Endpoints
```javascript
// RESTful APIs: kebab-case, plural nouns
GET    /api/users              // Get all users
GET    /api/users/{id}         // Get specific user
POST   /api/users              // Create user
PUT    /api/users/{id}         // Update user
DELETE /api/users/{id}         // Delete user

// Nested resources
GET    /api/users/{id}/orders  // Get user's orders
POST   /api/users/{id}/orders  // Create order for user

// Actions: clear verb-noun structure
POST   /api/users/{id}/activate    // Activate user
POST   /api/users/{id}/deactivate  // Deactivate user
POST   /api/users/{id}/reset-password  // Reset password
```

### Query Parameters
```javascript
// Filtering and sorting: descriptive
GET /api/users?is_active=true&sort_by=created_at&order=desc
GET /api/users?has_orders=true&min_age=18&max_age=65

// Pagination: clear and consistent
GET /api/users?page=1&page_size=20
GET /api/users?offset=0&limit=20
```

## Testing Naming

### Test Files and Functions
```python
# Test files: test_ prefix or _test suffix
test_user_service.py
user_service_test.py

# Test functions: descriptive with test_ prefix
def test_create_user_success():
    pass

def test_create_user_invalid_email_raises_error():
    pass

def test_get_user_by_id_returns_correct_user():
    pass

# Test classes: PascalCase with Test suffix
class TestUserService:
    def test_create_user_success(self):
        pass
    
    def test_create_user_invalid_email_raises_error(self):
        pass
```

### Test Data
```python
# Fixtures: descriptive with _fixture or _data suffix
@pytest.fixture
def valid_user_data():
    return {
        "name": "John Doe",
        "email": "john@example.com",
        "is_active": True
    }

# Mock objects: descriptive with mock_ prefix
mock_user_repository = Mock()
mock_email_service = Mock()

# Test constants: descriptive
VALID_USER_EMAIL = "test@example.com"
INVALID_USER_EMAIL = "invalid-email"
MAX_USER_NAME_LENGTH = 100
```

## Migration Strategy

### Analyzing Existing Code
```python
# Step 1: Analyze current patterns
def analyze_naming_conventions(codebase):
    """Analyze existing naming patterns in codebase."""
    patterns = {
        'variables': extract_variable_names(codebase),
        'functions': extract_function_names(codebase),
        'classes': extract_class_names(codebase),
        'constants': extract_constant_names(codebase)
    }
    
    # Identify inconsistencies
    inconsistencies = find_naming_inconsistencies(patterns)
    return patterns, inconsistencies

# Step 2: Document existing conventions
def document_existing_conventions(patterns):
    """Document current naming conventions."""
    convention_doc = {
        'variables': patterns['variables'].most_common_style,
        'functions': patterns['functions'].most_common_style,
        'classes': patterns['classes'].most_common_style,
        'exceptions': list(patterns['inconsistencies'])
    }
    return convention_doc
```

### Gradual Migration
```python
# Step 3: Create migration plan
def create_migration_plan(existing_conventions, target_conventions):
    """Create gradual migration plan."""
    plan = {
        'phase1': 'New code follows target conventions',
        'phase2': 'Refactor high-impact modules',
        'phase3': 'Update remaining codebase',
        'exceptions': 'Keep legacy patterns for stability'
    }
    return plan

# Step 4: Implement gradually
def migrate_module(module_name, target_conventions):
    """Migrate single module to target conventions."""
    # Backup original
    backup_module(module_name)
    
    # Apply new conventions
    apply_conventions(module_name, target_conventions)
    
    # Test thoroughly
    run_comprehensive_tests(module_name)
```

## Example Usage

### New Project Setup
"Help me establish naming conventions for our new Python web application"

### Code Review
"Review this JavaScript code for naming convention violations"

### Legacy Code Analysis
"Analyze the existing naming patterns in this Java codebase and suggest improvements"

### Team Guidelines
"Create naming convention guidelines for our full-stack development team"

### Migration Planning
"Plan a gradual migration from inconsistent naming to standard conventions"

## Key Principles

1. **Consistency is King**: Follow established patterns within each codebase
2. **Clarity Over Brevity**: `calculateUserAge` is better than `calcAge`
3. **Context Matters**: Consider the language, team, and project requirements
4. **Future Maintenance**: Name for the next developer who will read the code
5. **Tool Support**: Use linters and IDE features to enforce conventions

Remember: Good naming conventions make code self-documenting and easier to maintain. Always prioritize consistency and clarity in your naming decisions.
