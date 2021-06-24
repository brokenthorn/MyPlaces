using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyPlaces.Data.EfCore.Migrations
{
    public partial class initialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(16,13)", precision: 16, scale: 13, nullable: false),
                    Latitude = table.Column<decimal>(type: "decimal(16,14)", precision: 16, scale: 14, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GMPlaces",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(16,13)", precision: 16, scale: 13, nullable: false),
                    Latitude = table.Column<decimal>(type: "decimal(16,14)", precision: 16, scale: 14, nullable: false),
                    CityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GMPlaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GMPlaces_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GMPlaces_CityId",
                table: "GMPlaces",
                column: "CityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GMPlaces");

            migrationBuilder.DropTable(
                name: "Cities");
        }
    }
}
