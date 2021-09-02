
const tryBroadcastMessage = (data={}, channel="defaultDayiChannel") => {
  if(!window.BroadcastChannel) return void 0;
  const broadcastChannel = new window.BroadcastChannel(channel);
  broadcastChannel.postMessage(data);
  return broadcastChannel;
};
const tryListenBroadcastMessage = (channel='defaultDayiChannel', action=()=>{}) => {
  if(!window.BroadcastChannel) return void 0;
  const broadcastChannel = new window.BroadcastChannel(channel);
  broadcastChannel.onmessage = action;
  return broadcastChannel;
};
const ChannelEnum = {
  default:'defaultDayiChannel',
  driverAudit:'dayi-driver-audit',
  vehicleAudit:'dayi-vehicle-audit',
};
Object.freeze(ChannelEnum);
export {
  tryBroadcastMessage,
  tryListenBroadcastMessage,
  ChannelEnum,
};
