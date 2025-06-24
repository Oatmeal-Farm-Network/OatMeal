from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def get_countries(request):
    business_type = request.GET.get('BusinessType')
    if not business_type:
        return Response({"error": "BusinessType is required"}, status=status.HTTP_400_BAD_REQUEST)
    query = """
        SELECT DISTINCT Country 
        FROM vw_BusinessFullDetails 
        WHERE BusinessTypeID = %s AND Country IS NOT NULL AND Country <> ''
        ORDER BY Country;
    """
    with connection.cursor() as cursor:
        cursor.execute(query, [business_type])
        countries = [row[0] for row in cursor.fetchall()]
    return Response(countries)

@api_view(['GET'])
def get_states(request):
    business_type = request.GET.get('BusinessType')
    country = request.GET.get('country')
    if not business_type or not country:
        return Response({"error": "BusinessType and Country are required"}, status=status.HTTP_400_BAD_REQUEST)
    query = """
        SELECT DISTINCT State 
        FROM vw_BusinessFullDetails
        WHERE BusinessTypeID = %s AND Country = %s AND State IS NOT NULL AND State <> ''
        ORDER BY State;
    """
    with connection.cursor() as cursor:
        cursor.execute(query, [business_type, country])
        states = [row[0] for row in cursor.fetchall()]
    return Response(states)

@api_view(['GET'])
def get_businesses(request):
    business_type = request.GET.get('BusinessTypeID')
    country = request.GET.get('country')
    state = request.GET.get('state')

    if not business_type or not country:
        return Response({"error": "BusinessTypeID and Country are required"}, status=status.HTTP_400_BAD_REQUEST)

    query = """
        SELECT BusinessName, 
               Address, 
               City, 
               State, 
               ZipCode, 
               PeoplePhone,
               BusinessLogo AS ProfileImage,
               BusinessFacebook AS Facebook,
               BusinessPinterest AS Pinterest,
               BusinessX AS Twitter,
               BusinessInstagram AS Instagram,
               RanchHomeHeading AS Heading,
               RanchHomeText AS Description,
               RanchHomeText2 AS Description2,
               weblink AS Website,
               Showaddress AS ShowAddress
        FROM vw_BusinessFullDetails 
        WHERE BusinessTypeID = %s AND Country = %s
    """
    params = [business_type, country]

    if state:
        query += " AND State = %s"
        params.append(state)

    query += " ORDER BY custlastaccess DESC"

    with connection.cursor() as cursor:
        cursor.execute(query, params)
        businesses = [dict(zip([col[0] for col in cursor.description], row)) for row in cursor.fetchall()]
    MEDIA_URL_BASE = 'http://www.oatmealfarmnetwork.com//'
    for business in businesses:
        path = business.get("ProfileImage")
        if path and not path.startswith("http"):
            business["ProfileImage"] = f"{MEDIA_URL_BASE}{path}"    
    print(businesses)
    return Response(businesses)

    