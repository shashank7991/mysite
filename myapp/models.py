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

'''
=========================

from __future__ import unicode_literals
from django.utils import timezone

from django.db import models
# Create your models here.

class Role(models.Model):
    name = models.CharField(max_length=10, unique=True)

    def __unicode__(self):
        return "%s" % (self.name)

    def __str__(self):
        return "%s" % (self.name)

class Users(models.Model):
    user_id = models.CharField(unique=True, max_length=5, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    company_id = models.CharField(max_length=10)
    email = models.CharField(max_length=64, unique=True)
    password = models.CharField(max_length=20, default="abcd@1234")

    def __unicode__(self):
        return "%s" % (self.user_id)

    def __str__(self):
        return "%s" % (self.user_id)

class Trips(models.Model):
    trip_id = models.CharField(unique=True, max_length=5, null=True, blank=True)
    start_time = models.DateTimeField()
    start_time_local = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField()
    end_time_local = models.DateTimeField(default=timezone.now)
    duration = models.CharField(max_length=5, null=True)
    distance = models.CharField(max_length=12)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    score = models.FloatField()

    def __unicode__(self):
        return "%s" % (self.trip_id)

    def __str__(self):
        return "%s" % (self.trip_id)


class Events(models.Model):
    event_id = models.CharField(unique=True, max_length=5, null=True, blank=True)
    trip_id = models.ForeignKey(Trips, on_delete=models.CASCADE)
    event_type = models.CharField(max_length=40)
    event_ts = models.DateTimeField()
    event_ts_local = models.DateTimeField(default=timezone.now)
    geo_lat = models.FloatField()
    geo_long = models.FloatField()
    altitude = models.FloatField()
    vert_accuracy = models.FloatField()
    horiz_accuracy = models.FloatField()
    heading = models.CharField(max_length=20)
    speed = models.CharField(max_length=20)

    def __unicode__(self):
        return "%s" % (self.event_id)

    def __str__(self):
        return "%s" % (self.event_id)

'''	
	