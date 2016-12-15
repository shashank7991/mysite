from django.contrib import admin
from myapp.models import *
# Register your models here.

class UsersTableAdmin(admin.ModelAdmin):
	model = Users
	list_display = ("id","company_id","email","role")

class TripsTableAdmin(admin.ModelAdmin):
	model = Trips
	list_display = ('id','start_time','start_time_local','end_time','end_time_local','duration','distance','userid','score')
	
	def userid(self, instance):
		return instance.user_id.id

class EventsTableAdmin(admin.ModelAdmin):
	model = Events
	list_display = ('id','tripid','event_type','event_ts','event_ts_local','geo_lat','geo_long','altitude','vert_accuracy','horiz_accuracy','heading','speed')

	def tripid(self, instance):
		return instance.trip_id.id

admin.site.register(Users, UsersTableAdmin)
admin.site.register(Trips, TripsTableAdmin)
admin.site.register(Events, EventsTableAdmin)
