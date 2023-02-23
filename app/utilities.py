# Utilities file to contain misc. functions that will be used often

def destructure_row(row_object):
    """
    Functions to destructure the row objects from queries
    into a list of usable models
    """
    final_rows = list()
    for item in row_object:
        obj, *_ = item
        final_rows.append(obj)
    return final_rows


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
