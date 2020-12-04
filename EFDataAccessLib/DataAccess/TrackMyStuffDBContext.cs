using EFDataAccessLib.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EFDataAccessLib.DataAccess
{
    public class TrackMyStuffDBContext : DbContext
    {
        public TrackMyStuffDBContext(DbContextOptions options) : base(options) { }

        public DbSet<Item> Item { get; set; }
    }
}
