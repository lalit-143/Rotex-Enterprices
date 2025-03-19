from django.urls import path
from myapp import views

urlpatterns = [
    path('', views.home, name="home"),
    path('about/', views.about, name="about"),
    path('products/', views.products, name="products"),
    path('industries/', views.industries, name="industries"),
    path('quality/', views.quality, name="quality"),
    path('contact/', views.contact, name="contact"),
    path('enquiry/', views.submit_enquiry, name="submit_enquiry"),
    path('submit-quote/', views.submit_quote, name="submit_quote"),
]