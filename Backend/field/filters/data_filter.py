import django_filters
from field.models import Data
class DataFilter(django_filters.FilterSet):

    class Meta:
        model = Data
        fields = ['field', 'crop']