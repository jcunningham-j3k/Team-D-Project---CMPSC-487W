// lib/services/dummy_data_service.dart

import 'dart:math';

class DummyDataService {
  /// Generates dummy busy hours data for each day of the week.
  /// Returns a list with 7 double values representing busy hours (e.g., 2 to 10 hours).
  static List<double> generateBusyHours() {
    final random = Random();
    // Create a list of 7 values (Mon to Sun) with values between 2 and 10 hours.
    return List<double>.generate(7, (_) => 2 + random.nextInt(9).toDouble());
  }

  /// Returns dummy usage reasons as a map.
  /// The keys are usage reasons and values are percentages.
  static Map<String, double> generateUsageReasons() {
    // These percentages are fixed for now.
    return {
      "Studying": 40.0,
      "Group Project": 25.0,
      "Meeting": 15.0,
      "Relaxing": 10.0,
      "Just Exploring": 10.0,
    };
  }

  /// Returns dummy summary statistics.
  /// Keys are the stat names and values are their string representations.
  static Map<String, String> generateSummaryStats() {
    return {
      "Total Hours": "2500",
      "Unique Users": "150",
      "Avg. Visit": "2 hrs",
    };
  }
}
