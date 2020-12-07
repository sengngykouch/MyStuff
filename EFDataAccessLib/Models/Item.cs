using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EFDataAccessLib.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(300)]
        public string Location { get; set; }
       
        [MaxLength(500)]
        public string Description { get; set; }

        public DateTime? ExpirationDate { get; set; }
    }
}
