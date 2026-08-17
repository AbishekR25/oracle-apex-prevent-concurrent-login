DECLARE v_count NUMBER; BEGIN SELECT COUNT(*) INTO v_count FROM
          USER_SESSION WHERE UPPER(username) = UPPER(:P9999_USERNAME); IF
          v_count > 0 THEN APEX_ERROR.ADD_ERROR( p_message => 'You are already
          logged in on another device or tab.', p_display_location =>
          APEX_ERROR.c_inline_in_notification ); ELSE INSERT INTO USER_SESSION (
          SESSION_ID, USERNAME, LOGIN_TIME, PRE_AUTHENTICATIO_SESSION_STATUS,
          USER_AGENT, IP_ADDRESS, APEX_SESSION, CONCURRENT_ID ) VALUES (
          SYS_GUID(), :P9999_USERNAME, SYSTIMESTAMP, 'Y',
          OWA_UTIL.GET_CGI_ENV('HTTP_USER_AGENT'),
          OWA_UTIL.GET_CGI_ENV('REMOTE_ADDR'), V('APP_SESSION'),
          USER_SESSION_SEQ.NEXTVAL ); COMMIT; END IF; END;
