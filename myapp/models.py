from __future__ import unicode_literals

from django.db import models

ROLE_CHOICES = (
    ('A', ("Admin")),
    ('C', ("Client")),
    ('D', ("Driver"))
	)

class Users(models.Model):
    company_id = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    role = models.CharField(max_length=20,choices=ROLE_CHOICES)
    rank = models.FloatField(null=True,blank=True)
    password = models.CharField(max_length=20, default="abcd@1234")



class Trips(models.Model):
	start_time = models.DateTimeField() #UTC is 5 hour ahead thean EST
	end_time = models.DateTimeField()
	start_time_local = models.DateTimeField(auto_now_add=True) #EST/PST
	end_time_local = models.DateTimeField(auto_now_add=True)
	duration = models.FloatField()
	distance = models.FloatField()
	user_id = models.ForeignKey(Users)
	score = models.FloatField()


class Events(models.Model):
	trip_id = models.ForeignKey(Trips)
	event_type = models.CharField(max_length=100)
	event_ts = models.DateTimeField(auto_now_add=True)
	event_ts_local = models.DateTimeField(auto_now_add=True)
	geo_lat = models.FloatField()
	geo_long = models.FloatField()
	altitude = models.FloatField()
	vert_accuracy = models.IntegerField()
	horiz_accuracy = models.IntegerField()
	heading = models.FloatField()
	speed = models.FloatField()
