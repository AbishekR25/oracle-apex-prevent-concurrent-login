DECLARE v_user VARCHAR2(100) := LOWER(apex_application.g_x01);
          v_action VARCHAR2(10) := NVL(apex_application.g_x02, 'UPDATE'); BEGIN
          IF v_action = 'UPDATE' THEN UPDATE USER_SESSION SET LAST_ACTIVITY =
          SYSTIMESTAMP WHERE LOWER(USERNAME) = v_user AND
          PRE_AUTHENTICATIO_SESSION_STATUS = 'Y'; IF SQL%ROWCOUNT = 0 THEN
          INSERT INTO USER_SESSION (...) VALUES (SYS_GUID(), v_user,
          SYSTIMESTAMP, SYSTIMESTAMP, 'Y', ...); END IF; ELSIF v_action =
          'DELETE' THEN DELETE FROM USER_SESSION WHERE LAST_ACTIVITY <
          (SYSTIMESTAMP - INTERVAL '30' SECOND) AND
          PRE_AUTHENTICATIO_SESSION_STATUS = 'Y'; END IF; COMMIT; HTP.P('{
          "status": "success" }'); EXCEPTION WHEN OTHERS THEN HTP.P('{ "status":
          "error", "message": "' || SQLERRM || '" }'); END;
