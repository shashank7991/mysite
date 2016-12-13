from django.shortcuts import render , redirect
#from django.views import View
from myapp.forms import *
from myapp.serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView


# Create your views here.

class HomeView(APIView):
	def get(self, request, *args, **kwargs):
		return render(request,'index.html')

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

