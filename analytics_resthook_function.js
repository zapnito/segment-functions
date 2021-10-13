/**
 * Please do not delete [used for Intellisense]
 * @param {ServerRequest} request The incoming webhook request
 * @param {Object.<string, any>} settings Custom settings
 * @return void
 */
async function onRequest(request, settings) {
	let eventBody = request.json();
	let userId = '';
	let sessionId = '';

	if (!!eventBody.properties.user_id) {
		userId = eventBody.properties.user_id.toString();
		sessionId = eventBody.properties.session_id;
	} else {
		sessionId = eventBody.properties.session_id;
	}

	switch (eventBody.name) {
		case 'content_view':
			eventFriendlyName = 'Content View';
			break;
		case 'profile_view':
			eventFriendlyName = 'Profile View';
			break;
		case 'channel_view':
			eventFriendlyName = 'Channel View';
			break;
		case 'room_view':
			eventFriendlyName = 'Room View';
			break;
		case 'follow':
			eventFriendlyName = 'Follow';
			break;
		case 'sign_in':
			eventFriendlyName = 'Sign In';
			break;
		case 'course_landed':
			eventFriendlyName = 'Course Landed';
			break;
		case 'course_content:viewed':
			eventFriendlyName = 'Course Content View';
			break;
		case 'course_content:access_denied':
			eventFriendlyName = 'Course Content Access Denied';
			break;
		case 'ip_authentication:new_session':
			eventFriendlyName = 'Sign In - IP Authentication';
			break;
		default:
			eventFriendlyName = eventBody.name;
	}

	Segment.identify({
		userId: userId,
		anonymousId: sessionId,
		traits: {
			name: eventBody.properties.user
		}
	});

	Segment.track({
		event: eventFriendlyName,
		userId: userId,
		anonymousId: sessionId,
		properties: { ...eventBody.properties }
	});
}
