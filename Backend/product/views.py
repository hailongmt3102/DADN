from product.serializers import ProductionSerializer
from django.shortcuts import render
from .models import Production
from rest_framework import viewsets
from core.utils import response_gen

class ProductApi(viewsets.ViewSet):

    def get(self, request, *args, **kwargs):
        product_uid = request.query_params.get('uuid')
        
        product = Production.objects.get(uuid = product_uid)

        return response_gen(data= ProductionSerializer(product).data)


    def list(self, request, *args, **kargs):
        qs = Production.objects.all()
        
        data = ProductionSerializer(qs, many = True).data

        return response_gen(data = data)
