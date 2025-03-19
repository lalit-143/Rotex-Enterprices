from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from random import sample, choice
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

def home(request):  
    # Get random products
    product_objs = Product.objects.all()
    display_product = DisplayProduct.objects.first()
    show_products = list(display_product.show_products.all())
    hide_products = list(display_product.hide_products.all())
    # Filter out hidden products
    product_objs = [product for product in product_objs if product not in hide_products]
    # Get categories excluding hidden products
    categories = list(set(product.category for product in product_objs))
    # Select categories
    if len(categories) > 6 - len(show_products):
        selected_categories = sample(categories, 6 - len(show_products))
    else:
        selected_categories = categories
    random_products = show_products.copy()
    for category in selected_categories:
        products_in_category = [product for product in product_objs if product.category == category]
        if products_in_category:
            random_products.append(choice(products_in_category))
    # Ensure we have exactly 6 products
    while len(random_products) < 6:
        additional_product = choice(product_objs)
        if additional_product not in random_products:
            random_products.append(additional_product)
    
    industries_objs = Industry.objects.all()
    contact_obj = Contact.objects.first()
    data = {'industries': industries_objs, 'products': random_products, 'contact': contact_obj}
    return render(request, 'index.html', data)

def about(request):
    return render(request, 'about.html')

def products(request):
    product_objs = Product.objects.all()
    data = {'products': product_objs}
    return render(request, 'products.html', data)

def industries(request):
    industries_objs = Industry.objects.all()
    data = {'industries': industries_objs}
    return render(request, 'industries.html', data)

def quality(request):
    certificate_obj = Certificate.objects.first()
    data = {'certi': certificate_obj}
    return render(request, 'quality.html', data)

def contact(request):
    contact_obj = Contact.objects.first()
    data = {'contact': contact_obj}
    return render(request, 'contact.html', data)


@csrf_exempt
@require_POST
def submit_enquiry(request):
    name = request.POST.get('name', 'NA')
    number = request.POST.get('number', 'NA')
    email = request.POST.get('email', 'NA')
    message = request.POST.get('message', 'NA')
    try:
        enquiry = Enquiry(name=name, phone=number, email=email, message=message)
        enquiry.save()
        return JsonResponse({'status': 'success', 'message': 'Enquiry submitted successfully.'})
    except:
        return JsonResponse({'status': 'error', 'message': 'Problem to submit enquiry'})
    
    
@csrf_exempt
@require_POST
def submit_quote(request):
    contact = request.POST.get('contact', 'NA')
    product_id = request.POST.get('product_id', None)
    try:
        product = Product.objects.get(id=product_id)
        quote = Quote(contact=contact, product=product)
        quote.save()
        return JsonResponse({'status': 'success', 'message': 'Quote submitted successfully.'})
    except Product.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Product not found'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})