from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
import random
import json
from django.core import serializers

from .models import Card

global used

# Create your views here.
def home(request):
    global used
    used = []
    return render(request, "index.html")

def request(request):
    while len(used) != Card.objects.count():
        num = random.randint(0,Card.objects.count()-1)
        if num not in used:
            used.append(num)
            return JsonResponse(Card.objects.all()[num].toObj())

    return JsonResponse({"win": True})  

def creatorlogin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("datacreation")

    return render(request, "login.html")


def dataCreation(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        date = request.POST.get('year')
        image = request.POST.get('image')
        link = request.POST.get('link')
        text = request.POST.get('information')

        b = Card(title=title,date=date,pic=image,link=link,text=text)
        b.save()
        
        return redirect("datacreation")
        
    data = Card.objects.all

    return render(request, "dataCreation.html", {'data':data})