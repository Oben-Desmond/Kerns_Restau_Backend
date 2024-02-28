import { InventoryStatsController } from "../controllers/inventoryStats";
import express from "express";
import { RentalStatsController } from "../controllers/rentalStats";
import { KitchenStatsController } from "../controllers/kitchenStats";
import { RestaurantStatsController } from "../controllers/restaurantOrderStats";

const router = express.Router();

/** Get total inventory items*/
router.get("/inventory-items", InventoryStatsController.getTotalInventoryItem);

/** Get Low stock inventory items */
router.get("/low-stock-items", InventoryStatsController.getTotalLowStockItem);

/** Get Out of stock inventory items */
router.get(
  "/out-of-stock-items",
  InventoryStatsController.getTotalOutOfStockItem
);

/** Get total purchase orders */
router.get(
  "/total-purchase-orders",
  InventoryStatsController.getTotalPurchaseOrder
);

/** Get inventory stock levels */
router.get(
  "/inventory-stock-levels",
  InventoryStatsController.getInventoryStockLevel
);

/**
 *  Rental Services Routes
 */

/** Get rental items */
router.get("/rental-items", RentalStatsController.getAllRentalItem);

/** Get rental total income */
router.get("/rental-total-icome", RentalStatsController.getRentalIncome);

/** Get Total rental orders */
router.get("/rental-total-orders", RentalStatsController.getTotalRentalOrders);

/** Get rental items out of stocks */
router.get(
  "/rental-items-out-of-stock",
  RentalStatsController.getRentalItemOutOfStock
);

/** Get rental total income graph */
router.get(
  "/rental-total-income-graph",
  RentalStatsController.getRentalIncomeForGraph
);

/**
 * Kitchen service stats router
 *
 */

/** Get total kitchen Orders */
router.get("/kitchen-total-orders", KitchenStatsController.getKitchenOrders);

/** Get total pending orders */
router.get(
  "/kitchen-pending-orders",
  KitchenStatsController.getKitchenPendingOrders
);

/** Get total prepared orders */
router.get(
  "/kitchen-prepared-orders",
  KitchenStatsController.getKitchenCompletedOrders
);

/** Get total kitchen orders */
router.get(
  "/kitchen-total-stats-orders",
  KitchenStatsController.getTotalKitchenOrderStats
);

/**
 *  Restaurant order statistics
 */

/** Get total Income  */
router.get(
  "/restaurant-order-income",
  RestaurantStatsController.getRestaurantOrdersTotalIncome
);

/** Total completed orders */
router.get(
  "/restaurant-order-completed-orders",
  RestaurantStatsController.getRestaurantCompletedOrders
);

/** Total number of available menu items */
router.get(
  "/restaurant-order-available-menu-items",
  RestaurantStatsController.getNumberOfAvailableMenuItems
);

/** Get total order income graph */
router.get(
  "/restaurant-total-order-income-graph",
  RestaurantStatsController.getRestaurantDateIncome
);

export default router;
