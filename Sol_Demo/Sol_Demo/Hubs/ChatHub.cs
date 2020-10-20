using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sol_Demo.Hubs
{
    public interface IChatClient
    {
        Task SendMessageToClientJsMethod(string user, string message);
    }

    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(string user, string message)
        {
            //await base.Clients.All.SendAsync("SendMessageToClientJsMethod", user, message);
            await base.Clients.All.SendMessageToClientJsMethod(user, message);
        }
    }
}