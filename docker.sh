IP=`ip add | grep global | awk -F ' ' '{print $2}' | awk -F '/' '{print $1}'`
echo "Registering $SERVICE_NAME:$SERVICE_PORT in etcd server $ETCD_ADDR"
curl -XPUT $ETCD_ADDR/v2/keys/services/$SERVICE_NAME -d value="$IP:$SERVICE_PORT"
godep restore && go install && /usr/lib/go/bin/gh1