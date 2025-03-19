from django.db import models

# Create your models here.

class Product(models.Model):
    category = models.CharField(max_length=100, default=None)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to = 'products', default=None)
    description = models.TextField(default=None)
    specs = models.JSONField(default=list, blank=True)
    
    def __str__(self):
        return str(self.id) + " - " + self.category + " - " + self.name
    
class DisplayProduct(models.Model):
    show_products = models.ManyToManyField(Product, related_name='display_show_products', blank=True)
    hide_products = models.ManyToManyField(Product, related_name='display_hide_products', blank=True)
    
    def __str__(self):
        return str(self.id) + " - Display Product"
    
class Industry(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to = 'industries', default=None)
    description = models.TextField(default=None)
    
    def __str__(self):
        return str(self.id) + " - " + self.name
 

class Contact(models.Model):
    phone1 = models.CharField(max_length=15, default=None)
    phone2 = models.CharField(max_length=15, default=None)
    urgent_phone = models.CharField(max_length=15, default=None)
    email = models.EmailField(default=None)
    business_hours = models.CharField(max_length=100)
    address = models.TextField(default=None)
    add_url = models.TextField(default=None)
    linkdin = models.CharField(max_length=100, default=None, blank=True)    
    facebook = models.CharField(max_length=100, default=None, blank=True)
    twitter = models.CharField(max_length=100, default=None, blank=True)
    instagram = models.CharField(max_length=100, default=None, blank=True)
    
    def __str__(self):
        return str(self.id) + " - " + " Contact Details "


class Certificate(models.Model):
    iso1_name = models.CharField(max_length=100)
    iso1_image = models.FileField(upload_to='certificates')
    iso2_name = models.CharField(max_length=100)
    iso2_image = models.FileField(upload_to='certificates')
    iso3_name = models.CharField(max_length=100)
    iso3_image = models.FileField(upload_to='certificates')
    show_gst = models.BooleanField(default=True)
    gst_pdf = models.FileField(upload_to='certificates', blank=True)
    show_udyam = models.BooleanField(default=True)
    udyam_pdf = models.FileField(upload_to='certificates', blank=True)
    
    def __str__(self):
        return "All Certificates"
    

class Enquiry(models.Model):
    name = models.CharField(max_length=100, default=None)
    email = models.EmailField(default=None, blank=True)
    phone = models.CharField(max_length=15, default=None, blank=True)
    message = models.TextField(default=None, blank=True)
    
    def __str__(self):
        return str(self.id) + " - " + self.name + " - " + self.email + " - " + self.phone
    
class Quote(models.Model):
    contact = models.CharField(max_length=100, default=None)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return str(self.id) + " - " + self.contact + " - " + self.product.name

