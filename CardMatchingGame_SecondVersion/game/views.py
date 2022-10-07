from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages
from .models import Rank
# Create your views here.

def index(request):
    name = Rank.objects.get(id = 1).first_name;
    return render(request, 'index.html', {'name': name})

def score(request):
    return render(request, 'score.html')

