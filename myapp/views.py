from django.shortcuts import render , redirect
from myapp.forms import *
from django.views
from myapp.serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
import csv


# Create your views here.

class HomeView(View1):
	def get(self, request, *args, **kwargs):
		return render(request,'index.html')
	def post(self, request):
		dataReader = csv.reader(request.FILES['file'], delimiter=',', quotechar='"')
		for row in dataReader:
			if row[0] != 'id':
				try:
					user = Users.objects.get(id=int(row[7]))
					Trips(start_time=row[1],start_time_local=row[2],end_time=row[3],end_time_local=row[4],
						duration=row[5],distance=row[6],user_id=user,score=row[8]).save()
					# trip = Trips.objects.get(id=int(row[1]))
					# Events(trip_id=trip,event_type=row[2],geo_lat=float(row[5]),geo_long=float(row[6]),altitude=float(row[7]),vert_accuracy=int(row[8]),
					# 	horiz_accuracy=int(row[9]),heading=float(row[10]),speed=float(row[11])).save()
					
				except:
					pass
        # for row in dataReader:
        # 	print row
        
		# data = request.data
		# try:
		# 	inst = Users.objects.filter(**data)
		# 	request.session['userId'] = inst[0].id

		# 	serializer = UsersSerializer(inst, many=True)
		# 	return Response(serializer.data)
		# except:
		# 	data = {'status':False,'msg':'No Matching records found!'}
		# 	return Response(data)

class LoginView(APIView):
	def post(self, request, *args, **kwargs):
		data = request.data
		try:
			inst = Users.objects.filter(**data)
			request.session['userId'] = inst[0].id

			serializer = UsersSerializer(inst, many=True)
			return Response(serializer.data)
		except:
			data = {'status':False,'msg':'No Matching records found!'}
			return Response(data)

class UsersView(APIView):
	def get(self, request, *args, **kwargs):
		inst = Users.objects.all()
		serializer = UsersSerializer(inst, many=True)
		return Response(serializer.data)

	def post(self, request, *args, **kwargs):
		data = request.data
		if 'rank' in data:
			try:
				inst = Users.objects.get(id=data['id'])
				inst.rank = float(data['rank'])
				inst.save()
			except:
				inst = []
		else:
			try:
				inst = Users.objects.filter(**data)
			except:
				inst = []
		serializer = UsersSerializer(inst, many=True)
		return Response(serializer.data)
	
class TripsView(APIView):
	def get(self, request, *args, **kwargs):
		inst = Trips.objects.all()
		serializer = TripsSerializer(inst, many=True)
		return Response(serializer.data)

	def post(self, request, *args, **kwargs):
		data = request.data
		try:
			inst = Trips.objects.filter(**data)
		except:
			inst = []
		serializer = TripsSerializer(inst, many=True)
		return Response(serializer.data)
	def delete(self, request, *args, **kwargs):
		data = request.data
		try:
			inst = Trips.objects.get(**data)
		except:
			inst = []
		inst.delete()
		return Response({'status':True,'msg':'Trip deleted successfully'})


class EventsView(APIView):
	def get(self, request, *args, **kwargs):
		inst = Events.objects.all()
		serializer =EventsSerializer(inst, many=True)
		return Response(serializer.data)

	def post(self, request, *args, **kwargs):
		data = request.data
		try:
			inst = Events.objects.filter(**data)
		except:
			inst = []
		serializer = EventsSerializer(inst, many=True)
		return Response(serializer.data)

	def delete(self, request, *args, **kwargs):
		data = request.data
		try:
			inst = Events.objects.get(**data)
		except:
			inst = []
		inst.delete()
		return Response({'status':True,'msg':'Event deleted successfully'})

