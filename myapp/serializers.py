from rest_framework import serializers
from myapp.models import *

class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('id','company_id','email','role','rank')

class TripsSerializer(serializers.HyperlinkedModelSerializer):
	user_id = UsersSerializer()
	class Meta:
		model = Trips
		fields = ('id','start_time','start_time_local','end_time','end_time_local','duration','distance','user_id','score')


class EventsSerializer(serializers.HyperlinkedModelSerializer):
	trip_id = TripsSerializer()
	class Meta:
		model = Events
		fields = ('id','trip_id','event_type','event_ts','event_ts_local','geo_lat','geo_long','altitude','vert_accuracy','horiz_accuracy','heading','speed')

