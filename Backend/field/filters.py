import django_filters
from django_filters.filters import DateFilter
from farm.models import Farm
class FieldFilter(django_filters.FilterSet):
    farm = django_filters.CharFilter('uuid',lookup_expr='exact')

    class Meta:
        model = Farm
        fields = []