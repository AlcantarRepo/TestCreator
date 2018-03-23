using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestCreator.Models
{
    public class TestUser
    {
        public long UserId { get; set; }
        public string FirstName { get; set; }
        public string Mail { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Repassword { get; set; }
        public DateTime AddedTime { get; set; }
        public string AddedTimeString { get; set; }
        public string Role { get; set; }


    }
}