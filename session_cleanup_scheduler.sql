BEGIN DBMS_SCHEDULER.CREATE_JOB( job_name => 'SESSION_CLEANUP_JOB',
          job_type => 'PLSQL_BLOCK', job_action => q'[ BEGIN DELETE FROM
          USER_SESSION WHERE LAST_ACTIVITY < (SYSTIMESTAMP - INTERVAL '15'
          SECOND); COMMIT; END; ]', start_date => SYSTIMESTAMP, repeat_interval
          => 'FREQ=SECONDLY;INTERVAL=3', enabled => TRUE, auto_drop => FALSE,
          comments => 'Deletes inactive user sessions older than 15 seconds' );
          END;
