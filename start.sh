./rancher-compose \
--project-name runapp_wa \
--url http://192.168.99.101:8080/v1/projects/1a5 \
--access-key 7DD44FCC7D0539DCCACE \
--secret-key tWjiXvnTTremDTsdjYDBScXFRFkLJZCbGvZo4fJG \
-f docker-compose.yml \
--verbose up \
-d --force-upgrade \
--confirm-upgrade