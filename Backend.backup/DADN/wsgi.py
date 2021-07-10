"""
WSGI config for DADN project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os, sys
# add the hellodjango project path into the sys.path
sys.path.append('/home/ben1904/DADN/Backend/DADN')

# add the virtualenv site-packages path to the sys.path
sys.path.append('/home/ben1904/DADN/Backend/env/lib/python3.8/site-packages')

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DADN.settings')
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', '/home/ben1904/DADN/Backend/DADN/settings')

application = get_wsgi_application()
