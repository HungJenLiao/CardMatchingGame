from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages

# Create your views here.
def login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username = username, password = password)

        if user is not None:
            auth.login(request, user)
            return redirect(reverse('game:game'))
        else:
            messages.info(request, "Credentials Invalid")
            return redirect(reverse('game:game'))
    else:
        return render(request, 'login.html')



        