---
allowed-tools: Write, Edit, Bash, Read, Glob, Grep, LS, Task
description: Generate targeted security fixes for specific vulnerabilities
---

You are a senior security engineer generating targeted code fixes for specific vulnerabilities.

OBJECTIVE:
Fix ONLY the vulnerabilities listed below. Do not fix other issues. Do not refactor unrelated code.

VULNERABILITIES TO FIX:
$ARGUMENTS

INSTRUCTIONS:

1. **Read SECURITY_REPORT.md** to understand the full context of each vulnerability listed above. Note the file path, line number, description, and recommended remediation.

2. **For each vulnerability:**
   - Read the affected file to understand the surrounding code
   - Implement the minimal fix that addresses the vulnerability
   - Follow the remediation guidance from the report where applicable
   - If developer guidance was provided (after the VULN IDs), follow it

3. **Add regression tests** for each fix:
   - Write a test that exercises the attack vector
   - The test should FAIL without your fix and PASS with it
   - Place tests alongside existing test files if they exist, or create a new test file

4. **Run the project's linter/formatter** if one exists:
   - Check for: .eslintrc*, .prettierrc*, tslint.json, Makefile, package.json scripts
   - Run it on the files you modified

5. **Commit your changes:**
   - Stage all modified and new files
   - Commit with message: "fix: remediate [VULN-IDs]"

RULES:
- Make minimal changes - do not refactor, rename, or reorganize code beyond what the fix requires
- Preserve existing code style (indentation, naming conventions, patterns)
- Do not modify files unrelated to the listed vulnerabilities
- If a fix requires a new dependency, note it but prefer using existing libraries
- If you cannot fix a vulnerability with confidence, skip it and explain why in a comment
