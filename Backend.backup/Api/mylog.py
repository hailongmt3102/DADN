import logging
import json



def my_log(arg):
    logger = logging.getLogger("django")
    try:
        logger.log(logging.ERROR, json.dumps(arg))
    except Exception:
        logger.log(logging.ERROR, str(arg))
