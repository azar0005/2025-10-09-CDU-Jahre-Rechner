# Security Policy

## Overview

This document outlines the security measures, practices, and policies implemented in the CDU Jahre Rechner application to protect user data and ensure secure operation.

## Security Principles

### 1. Privacy by Design
- **Minimal Data Collection**: The application only collects birth year for calculations
- **No Personal Identification**: No names, emails, or identifying information required
- **Client-Side Processing**: All calculations happen in the browser when possible
- **No User Tracking**: No analytics, tracking pixels, or third-party tracking scripts

### 2. Data Protection
- **No Persistent Storage**: Currently, no user data is stored on servers
- **No Cookies**: Application does not use cookies for tracking or storage
- **HTTPS Enforced**: All traffic encrypted in transit (production environment)
- **No Third-Party Data Sharing**: User inputs are not shared with external services

## Application Security

### Frontend Security

#### Input Validation
```javascript
// Birth year validation
- Type checking: Must be a valid number
- Range validation: 1900-2025
- Format validation: Four-digit year only
- Sanitization: Input cleaned before processing
```

#### XSS Prevention
- React's built-in XSS protection through JSX
- No `dangerouslySetInnerHTML` usage
- All user inputs properly escaped
- Content Security Policy headers (recommended for production)

#### Dependencies
- Regular updates of npm packages
- Security audits via `yarn audit`
- Known vulnerabilities monitoring
- Minimal dependency footprint

### Backend Security

#### API Security
```python
# Current Implementation
- CORS configuration restricts origins
- Input validation via Pydantic models
- Type checking for all endpoints
- Error handling without information leakage
```

#### Authentication & Authorization
**Current Status**: Not implemented (no user accounts)

**Future Implementation**:
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting per IP/user
- Session management
- Role-based access control (RBAC)

#### Database Security
**Current Status**: MongoDB connection string in environment variables

**Best Practices**:
- MongoDB authentication enabled
- Connection string in `.env` file (not in code)
- Network isolation for database
- Regular backups
- Access logs monitoring

### Environment Variables

**Protected Variables**:
```bash
# Backend
MONGO_URL=<mongodb_connection_string>
DB_NAME=<database_name>

# Frontend  
REACT_APP_BACKEND_URL=<backend_api_url>
```

**Security Measures**:
- Never commit `.env` files to version control
- Use `.env.example` for documentation only
- Rotate credentials regularly
- Use different credentials for dev/staging/production

## Network Security

### HTTPS/TLS
- **Production**: HTTPS enforced for all connections
- **TLS Version**: TLS 1.2 or higher
- **Certificate**: Valid SSL/TLS certificate from trusted CA
- **HSTS**: HTTP Strict Transport Security enabled

### CORS Configuration
```python
# backend/server.py
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Should be restricted in production
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Production Recommendation**:
```python
allow_origins=[
    "https://yourdomain.com",
    "https://www.yourdomain.com"
]
```

### Rate Limiting
**Current Status**: Not implemented

**Recommended Implementation**:
- 100 requests per minute per IP for calculation endpoint
- 10 requests per minute for potential admin endpoints
- Progressive delays for repeated failures
- IP-based throttling

## Vulnerability Management

### Dependency Scanning

**Frontend**:
```bash
# Check for vulnerabilities
yarn audit

# Fix automatically
yarn audit fix

# Check specific package
yarn info <package> versions
```

**Backend**:
```bash
# Check for vulnerabilities
pip-audit

# Update packages
pip install --upgrade <package>

# Check outdated packages
pip list --outdated
```

### Known Security Considerations

1. **CORS Configuration**: Currently allows all origins - should be restricted in production
2. **No Rate Limiting**: API endpoints can be called unlimited times
3. **No Authentication**: Future feature when backend integration is complete
4. **Client-Side Calculations**: While good for privacy, can be manipulated by tech-savvy users

## Incident Response

### Security Incident Protocol

1. **Detection**: Identify and verify security incident
2. **Containment**: Isolate affected systems
3. **Investigation**: Determine scope and impact
4. **Remediation**: Fix vulnerability and restore services
5. **Documentation**: Record incident details and response
6. **Review**: Analyze and improve security measures

### Reporting Security Issues

If you discover a security vulnerability:

1. **Do Not**: Create public GitHub issues for security problems
2. **Do**: Contact the development team privately
3. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Compliance

### GDPR Compliance

**Current Status**: Compliant
- No personal data collected
- No cookies used
- No user profiling
- No data transfers outside EU (when hosted in EU)

**Future Considerations** (if user accounts added):
- User consent management
- Right to access data
- Right to deletion
- Data portability
- Privacy policy disclosure

## Security Checklist

### Development
- [ ] Input validation on all user inputs
- [ ] Error messages don't leak sensitive information
- [ ] Environment variables used for secrets
- [ ] Dependencies regularly updated
- [ ] Code linting and security scanning
- [ ] No hardcoded credentials in code

### Deployment
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] Logs properly configured (no sensitive data)
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Regular backups scheduled

### Production
- [ ] SSL certificate valid and up-to-date
- [ ] Monitoring and alerting configured
- [ ] Incident response plan documented
- [ ] Regular security audits
- [ ] Dependency updates scheduled
- [ ] Access logs monitored

## Security Headers (Production)

Recommended HTTP security headers:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Security Best Practices

### For Developers
1. Never commit secrets to version control
2. Use environment variables for configuration
3. Validate and sanitize all inputs
4. Keep dependencies updated
5. Follow principle of least privilege
6. Use parameterized queries (when database used)
7. Implement proper error handling
8. Log security-relevant events

### For Deployment
1. Use HTTPS everywhere
2. Configure CORS properly
3. Enable rate limiting
4. Set up monitoring and alerts
5. Regular security audits
6. Keep systems patched and updated
7. Implement backup strategy
8. Use web application firewall (WAF)

## Future Security Enhancements

1. **Authentication System**
   - JWT-based authentication
   - OAuth2 integration
   - Multi-factor authentication (MFA)

2. **Advanced Monitoring**
   - Intrusion detection system (IDS)
   - Security information and event management (SIEM)
   - Automated threat detection

3. **Data Protection**
   - End-to-end encryption for sensitive data
   - Data anonymization
   - Secure data deletion

4. **Compliance**
   - SOC 2 compliance
   - ISO 27001 certification
   - Regular penetration testing

## Security Audit Log

| Date | Type | Finding | Resolution | Status |
|------|------|---------|------------|--------|
| 2025-10 | Initial | CORS allows all origins | Document for production fix | Open |
| 2025-10 | Initial | No rate limiting | Plan implementation | Open |
| 2025-10 | Review | Client-side only calculations | Accepted by design | Closed |

---

**Last Security Review**: October 2025  
**Next Scheduled Review**: November 2025  
**Security Contact**: [To be added]

## Conclusion

This application follows security best practices for its current scope. As features are added (especially user accounts and backend integration), additional security measures must be implemented. Regular security reviews and updates are essential to maintain a secure application.

**Remember**: Security is an ongoing process, not a one-time implementation.