from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages

# Create your views here.
def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']
        
        if password == password2:
            if User.objects.filter(email = email).exists():
                messages.info(request, "Email Aleardy Used")
                return redirect('/register/')
            elif User.objects.filter(username = username).exists():
                messages.info(request, "Username Aleardy Used")
                return redirect('/register/')
            else:
                user = User.objects.create_user(username = username, email = email, password = password)
                user.save()
                return redirect(reverse('login:login'))
        else:
            messages.info(request, "Password Not The Same")
            return redirect('/register/')
    else:
        return render(request, 'register.html')