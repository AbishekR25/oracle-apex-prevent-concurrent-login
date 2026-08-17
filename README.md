# Oracle APEX Multi Concurrent Login

A JavaScript and Oracle database-based solution to prevent duplicate browser tabs and concurrent logins from multiple devices in an Oracle APEX application.

## Features

* Prevents duplicate browser tabs for the same user.
* Prevents concurrent login from another device or browser.
* Uses `localStorage` and `sessionStorage` for tab tracking.
* Uses a Web Worker for background heartbeat monitoring.
* Updates user activity through an APEX Application Process.
* Automatically removes inactive sessions using `DBMS_SCHEDULER`.
* Displays a warning when another active tab is detected.

## Files

| File                            | Description                                       |
| ------------------------------- | ------------------------------------------------- |
| `single_tab_session_control.js` | Detects and prevents duplicate browser tabs.      |
| `session_heartbeat_worker.js`   | Handles background session heartbeat.             |
| `heartbeat_session_process.sql` | Updates and manages user session activity.        |
| `duplicate_tab_modal.html`      | Displays the duplicate-tab warning.               |
| `login_session_validation.sql`  | Validates active sessions during login.           |
| `session_cleanup_scheduler.sql` | Cleans up inactive sessions using DBMS Scheduler. |

## Technologies

Oracle APEX · JavaScript · PL/SQL · Web Worker · HTML · LocalStorage · SessionStorage · DBMS Scheduler
