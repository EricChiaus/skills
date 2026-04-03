---
name: react-frontend-expert
description: React frontend expert skill for building clean, performant, and maintainable React applications. Focuses on component architecture, hooks optimization, async patterns, UI reusability, and performance best practices. Perfect for React development with modern patterns and lifecycle optimization.
---

# React Frontend Expert Skill

This skill provides comprehensive guidance for building high-quality React applications with clean code principles, optimal performance, and maintainable architecture.

## When to Use This Skill

Use this skill when the user requests:
- React component development and architecture
- Performance optimization and rerender reduction
- Custom hooks and logic extraction
- UI component reusability patterns
- Async data handling and parallel processing
- React lifecycle and dependency optimization
- Clean code and structure best practices

## Core Capabilities

### Component Architecture
- **Clean Component Design**: Single responsibility, focused components
- **Logic Separation**: Extract business logic into custom hooks
- **Props Interface**: Well-defined prop types and interfaces
- **Component Composition**: Build complex UIs from simple components

### Performance Optimization
- **Rerender Reduction**: Optimize dependency arrays and memoization
- **Lazy Loading**: Code splitting and component lazy loading
- **Virtual Scrolling**: Efficient rendering of large lists
- **State Management**: Optimal state updates and subscriptions

### Modern React Patterns
- **Custom Hooks**: Reusable logic extraction and sharing
- **Higher-Order Components**: Component enhancement patterns
- **Render Props**: Flexible component composition
- **Context API**: Efficient state sharing and provider patterns

## Clean Code Principles

### Component Structure
- **Single Responsibility**: Each component handles one concern
- **Small Functions**: Keep components under 100-150 lines
- **Descriptive Naming**: Clear, meaningful component and prop names
- **Consistent Ordering**: Imports, types, hooks, logic, JSX

### Code Organization
```javascript
// 1. Imports (external libraries first, then internal)
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/Button';
import { useUserData } from '../hooks/useUserData';

// 2. Types and interfaces
interface UserCardProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

// 3. Component definition
export const UserCard: React.FC<UserCardProps> = ({ userId, onUpdate }) => {
  // 4. Hooks (state, effects, custom hooks)
  const { user, loading, error } = useUserData(userId);
  const [isEditing, setIsEditing] = useState(false);
  
  // 5. Event handlers (useCallback for optimization)
  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);
  
  // 6. Derived values and effects
  const displayName = useMemo(() => 
    user ? `${user.firstName} ${user.lastName}` : 'Loading...', 
    [user]
  );
  
  // 7. Conditional rendering logic
  if (loading) return <SkeletonCard />;
  if (error) return <ErrorCard error={error} />;
  if (!user) return <EmptyCard />;
  
  // 8. JSX return
  return (
    <Card>
      <h3>{displayName}</h3>
      <Button onClick={handleEdit}>Edit</Button>
    </Card>
  );
};
```

## Logic Extraction via Custom Hooks

### Custom Hook Guidelines
- **Single Purpose**: Each hook handles one specific concern
- **Reusability**: Design hooks to be reusable across components
- **Clear Interface**: Well-defined return values and parameters
- **Error Handling**: Consistent error handling patterns

### Example Custom Hooks
```javascript
// Data fetching hook with loading states
export function useApiData<T>(url: string, options?: RequestOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Local storage hook with synchronization
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setStoredValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(value) : value;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setStoredValue] as const;
}
```

## UI Component Reusability

### Component Design Patterns
- **Presentational Components**: Focus on UI, no business logic
- **Container Components**: Handle data fetching and state
- **Compound Components**: Related components that work together
- **Render Props**: Share logic between components

### Reusable UI Components
```javascript
// Base button component with variants
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;
  const disabledClasses = disabled ? 'btn-disabled' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};

// Form input with validation
interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  type = 'text'
}) => {
  const inputId = useId();
  
  return (
    <div className="form-group">
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`form-input ${error ? 'error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <span id={`${inputId}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};
```

## High-Level Components

### Layout Components
```javascript
// Page layout with consistent structure
export const PageLayout: React.FC<{
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ title, children, actions }) => (
  <div className="page-layout">
    <header className="page-header">
      <h1>{title}</h1>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
    <main className="page-content">
      {children}
    </main>
  </div>
);

// Section wrapper for consistent spacing
export const Section: React.FC<{
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className }) => (
  <section className={`section ${className || ''}`}>
    {title && <h2 className="section-title">{title}</h2>}
    <div className="section-content">
      {children}
    </div>
  </section>
);
```

### Provider Components
```javascript
// Theme provider with context
const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  theme?: Theme;
}> = ({ children, theme = defaultTheme }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};
```

## Async Parallel Processing

### Concurrent Data Fetching
```javascript
// Parallel API calls with Promise.all
export function useParallelData(userIds: string[]) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setErrors([]);
    
    try {
      // Fetch all users in parallel
      const userPromises = userIds.map(id => 
        fetch(`/api/users/${id}`).then(res => res.json())
      );
      
      const userResults = await Promise.allSettled(userPromises);
      
      const successfulUsers: User[] = [];
      const newErrors: string[] = [];
      
      userResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successfulUsers.push(result.value);
        } else {
          newErrors.push(`Failed to fetch user ${userIds[index]}: ${result.reason}`);
        }
      });
      
      setUsers(successfulUsers);
      setErrors(newErrors);
    } catch (error) {
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  }, [userIds]);

  useEffect(() => {
    if (userIds.length > 0) {
      fetchUsers();
    }
  }, [fetchUsers]);

  return { users, loading, errors, refetch: fetchUsers };
}

// Concurrent operations with React Concurrent Features
export function AsyncDataLoader({ endpoints }: { endpoints: string[] }) {
  const [data, setData] = useState<Record<string, any>>({});
  
  // Use Suspense for concurrent loading
  const dataPromises = endpoints.map(async (endpoint) => {
    const response = await fetch(endpoint);
    return [endpoint, await response.json()];
  });

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AsyncComponent dataPromises={dataPromises} />
    </Suspense>
  );
}
```

## Lifecycle and Dependency Optimization

### Dependency Array Best Practices
```javascript
// ❌ BAD: Dependencies cause unnecessary rerenders
useEffect(() => {
  fetchData();
}, [userId, userName, userEmail]); // Changes frequently

// ✅ GOOD: Minimal, stable dependencies
useEffect(() => {
  fetchData();
}, [userId]); // Only changes when user ID changes

// ❌ BAD: Creating objects in dependencies
useEffect(() => {
  api.updateUser({ id, name, email });
}, [{ id, name, email }]); // New object every render

// ✅ GOOD: Use useMemo for stable dependencies
const userData = useMemo(() => ({ id, name, email }), [id, name, email]);
useEffect(() => {
  api.updateUser(userData);
}, [userData]);
```

### Memoization Strategies
```javascript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return data.items.reduce((sum, item) => sum + item.value, 0);
}, [data.items]);

// Memoize event handlers
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);

// Memoize components with React.memo
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return (
    <div>
      {data.map(item => (
        <Item key={item.id} item={item} onUpdate={onUpdate} />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for precise re-render control
  return prevProps.data.length === nextProps.data.length &&
         prevProps.onUpdate === nextProps.onUpdate;
});

// Use callback refs for imperative operations
const inputRef = useCallback((input: HTMLInputElement | null) => {
  if (input) {
    input.focus();
    input.setSelectionRange(0, input.value.length);
  }
}, []);
```

### Performance Monitoring
```javascript
// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());
  
  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${componentName} rendered ${renderCount.current} times. ` +
        `Time since last render: ${timeSinceLastRender}ms`
      );
    }
    
    lastRenderTime.current = now;
  });
  
  return renderCount.current;
}

// Usage in component
const MyComponent = ({ data }) => {
  const renderCount = usePerformanceMonitor('MyComponent');
  
  return <div>Render count: {renderCount}</div>;
};
```

## Code Quality Standards

### TypeScript Integration
- **Strict Typing**: Use strict TypeScript configuration
- **Interface Definitions**: Clear prop and state interfaces
- **Generic Components**: Reusable typed components
- **Type Guards**: Runtime type checking

### Testing Requirements
- **Unit Tests**: Component logic and hooks
- **Integration Tests**: Component interactions
- **Accessibility Tests**: ARIA compliance
- **Performance Tests**: Render performance

### Error Boundaries
```javascript
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error?.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Example Usage

### Component Development
"Help me create a reusable data table component with sorting, filtering, and pagination using React best practices"

### Performance Optimization
"Optimize this React component to reduce unnecessary rerenders and improve performance"

### Custom Hook Development
"Create a custom hook for managing form state with validation and async submission"

### Architecture Review
"Review this React application structure and suggest improvements for better maintainability"

Remember: Clean React code is maintainable, performant, and follows established patterns. Always consider the component lifecycle, dependency optimization, and reusability in your development.
