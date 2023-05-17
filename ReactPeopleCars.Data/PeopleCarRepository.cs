using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleCars.Data
{
    public class PeopleCarRepository
    {
        private string _connectionString;

        public PeopleCarRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using var context = new PeopleCarDbContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleCarDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void DeleteCars(int id)
        {
            using var context = new PeopleCarDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM cars WHERE PersonId = {id}");
            context.SaveChanges();
        }
        public void AddCar(Car car)
        {
            using var context = new PeopleCarDbContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }

        public List<Car> GetCars(int id)
        {
            using var context = new PeopleCarDbContext(_connectionString);
            return context.Cars.Where(car => car.PersonId == id).ToList();
        }
        public Person GetPerson(int id)
        {
            using var context = new PeopleCarDbContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
    }
}
