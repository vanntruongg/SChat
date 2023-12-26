export const generateRoomName = (user1Id: number = 0, user2Id: number) => {
  const sortedUserIds = [user1Id, user2Id].sort((a, b) => a - b);
  return `private_room_chat_${sortedUserIds.join('_')}`;
};
