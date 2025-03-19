from django.contrib import admin
from .models import *

admin.site.register(Product)
admin.site.register(Industry)
admin.site.register(Contact)

admin.site.register(Certificate)

admin.site.register(Enquiry)
admin.site.register(Quote)

admin.site.register(DisplayProduct)