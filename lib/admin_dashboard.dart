import 'package:flutter/material.dart';
// Remove dummy import
// import '../../dummy.dart';
import 'header.dart';
import 'summary_statistics.dart';
import 'usage_reasons_chart.dart';
import 'weekly_busy_hours_chart.dart';


class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Wrap content in a scrollable view to handle different screen sizes
    return Scaffold(
      appBar: AppBar(
        title: const Text("Admin Dashboard"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Header(logoUrl: null), // You can pass a URL if available
            const SizedBox(height: 12),
            const SummaryStatistics(),
            const SizedBox(height: 24),
            WeeklyBusyHoursChart(),
            const SizedBox(height: 24),
            UsageReasonsChart(),
          ],
        ),
      ),
    );
  }
}
