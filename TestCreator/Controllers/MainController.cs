using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestCreator.Data;
using TestCreator.Models;

namespace TestCreator.Controllers
{
    public class MainController : Controller
    {

        private static long userId = 0;
        private List<TestUser> userList = new List<TestUser>();

        // GET: Main
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult LoginOperation(TestUser model)
        {
            using(var dbContext = new TestCreatorEntities())
            {
                userId = dbContext.Uzytkownicy.Where(x => x.login == model.UserName).Where(x => x.haslo == model.Password).Select(x => x.id_uzytkownik).FirstOrDefault();

                var tempList = dbContext.GetAllUsers().ToList();

                

                foreach (var item in tempList)
                {
                    DateTime dt = (DateTime)item.data_dodania;
                    string date = dt.ToShortDateString();
                    TestUser tu = new TestUser()
                    {
                        UserId = (long)item.id_uzytkownik,
                        UserName = item.login,
                        FirstName = item.name,
                        AddedTimeString = date,
                        Role = item.nazwa
                        
                     

                    };
                    userList.Add(tu);
                }

                ViewBag.UsersList = userList;

                if(userId == 0)
                {
                    return null;
                }
                else
                {
                    return PartialView("_AdminMainPanel");
                }
            }

            
        }

        [HttpPost]
        public ActionResult UpdateUser(TestUser model)
        {
            using(var dbContext = new TestCreatorEntities())
            {
                return null;
            }
        }

    }
}