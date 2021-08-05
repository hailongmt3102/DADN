import django_filters
from field.models import Irrigation
class IrrigationFilter(django_filters.FilterSet):

    class Meta:
        model = Irrigation
        fields = ['field', 'crop']