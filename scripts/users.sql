-- Note : Create DEV_USERSER schema and grant necessary privileges:
-- Create DEV_USERSER schema
CREATE USER DEV_USER IDENTIFIED BY oracle;
GRANT CONNECT, RESOURCE TO DEV_USER;
GRANT SODA_APP TO DEV_USER;
ALTER USER DEV_USER QUOTA UNLIMITED ON USERS;
GRANT UNLIMITED tablespace to DEV_USER;
GRANT CREATE VIEW TO DEV_USER;

-- Note Create PROD_U schema and grant necessary privileges:
-- Create PROD_U schema
CREATE USER PROD_USER IDENTIFIED BY oracle;
GRANT CONNECT, RESOURCE TO PROD_USER;
GRANT SODA_APP TO PROD_USER;
ALTER USER PROD_USER QUOTA UNLIMITED ON USERS;
grant UNLIMITED tablespace to PROD_USER;
GRANT CREATE VIEW TO PROD_USER;

BEGIN
 ords_admin.enable_schema(
  p_enabled => TRUE,
  p_schema => 'DEV_USER',
  p_url_mapping_type => 'BASE_PATH',
  p_url_mapping_pattern => 'DEV_USER',
  p_auto_rest_auth => NULL
 );
 commit;
END;
/

BEGIN
 ords_admin.enable_schema(
  p_enabled => TRUE,
  p_schema => 'PROD_USER',
  p_url_mapping_type => 'BASE_PATH',
  p_url_mapping_pattern => 'PROD_USER',
  p_auto_rest_auth => NULL
 );
 commit;
END;
/