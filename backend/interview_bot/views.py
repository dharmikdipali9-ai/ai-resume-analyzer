from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from .models import InterviewSession

from .groq_interviewer import (
    generate_interview_reply
)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_interview(request):

    data = request.data

    session = InterviewSession.objects.create(

        user=request.user,

        role=data.get("role"),

        skills=data.get("skills"),

        conversation=[]
    )

    first_question = generate_interview_reply(

        data.get("role"),

        data.get("skills"),

        [
            {
                "role": "user",
                "content": "Start the interview"
            }
        ]
    )

    conversation = session.conversation

    conversation.append({
        "role": "assistant",
        "content": first_question
    })

    session.conversation = conversation

    session.save()

    return Response({

        "session_id": session.id,

        "question": first_question
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def continue_interview(request, session_id):

    data = request.data

    answer = data.get("answer")

    session = InterviewSession.objects.filter(
        id=session_id
    ).first()

    if not session:

        return Response({
            "error": "Session not found"
        }, status=404)

    conversation = session.conversation

    conversation.append({
        "role": "user",
        "content": answer
    })

    ai_reply = generate_interview_reply(

        session.role,

        session.skills,

        conversation
    )

    conversation.append({
        "role": "assistant",
        "content": ai_reply
    })

    session.conversation = conversation

    session.save()

    return Response({

        "reply": ai_reply
    })