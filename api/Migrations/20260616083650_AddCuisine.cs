using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Starter.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCuisine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChefId",
                table: "ChefServices",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CuisineId",
                table: "ChefServices",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "MaximumGuests",
                table: "ChefServices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinimumGuests",
                table: "ChefServices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Cuisine",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    isActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cuisine", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChefServices_ChefId",
                table: "ChefServices",
                column: "ChefId");

            migrationBuilder.CreateIndex(
                name: "IX_ChefServices_CuisineId",
                table: "ChefServices",
                column: "CuisineId");

            migrationBuilder.CreateIndex(
                name: "IX_Cuisine_Name",
                table: "Cuisine",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ChefServices_AspNetUsers_ChefId",
                table: "ChefServices",
                column: "ChefId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChefServices_Cuisine_CuisineId",
                table: "ChefServices",
                column: "CuisineId",
                principalTable: "Cuisine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChefServices_AspNetUsers_ChefId",
                table: "ChefServices");

            migrationBuilder.DropForeignKey(
                name: "FK_ChefServices_Cuisine_CuisineId",
                table: "ChefServices");

            migrationBuilder.DropTable(
                name: "Cuisine");

            migrationBuilder.DropIndex(
                name: "IX_ChefServices_ChefId",
                table: "ChefServices");

            migrationBuilder.DropIndex(
                name: "IX_ChefServices_CuisineId",
                table: "ChefServices");

            migrationBuilder.DropColumn(
                name: "ChefId",
                table: "ChefServices");

            migrationBuilder.DropColumn(
                name: "CuisineId",
                table: "ChefServices");

            migrationBuilder.DropColumn(
                name: "MaximumGuests",
                table: "ChefServices");

            migrationBuilder.DropColumn(
                name: "MinimumGuests",
                table: "ChefServices");
        }
    }
}
